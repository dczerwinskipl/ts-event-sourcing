import { Message, MessagePublisher } from "@app/core";
import { Context } from "@app/core/context";
import { Kafka, Producer } from "kafkajs";
import { v4 } from "uuid";

export type KafkaMessagePublisherOptions<M extends Message> = {
  topic: string;
  getKey?: (message: M) => string;
  getPartitionKey?: (message: M) => string;
};

export class KafkaMessagePublisher<M extends Message>
  implements MessagePublisher<M>
{
  topic: string;
  producer: Producer;
  getKey: (message: M) => string;
  getPartitionKey: ((message: M) => string) | undefined;

  constructor(kafkaClient: Kafka, options: KafkaMessagePublisherOptions<M>) {
    this.producer = kafkaClient.producer({
      allowAutoTopicCreation: true,
    });
    this.topic = options.topic;
    this.getKey = options.getKey ?? ((_) => v4());
    this.getPartitionKey = options.getPartitionKey;
  }

  getPartition(message: M): number | undefined {
    if (!this.getPartitionKey) return;

    const key = this.getPartitionKey(message);
    console.log(key);
    return undefined;
  }

  async publish(message: M, context: Context): Promise<void> {
    try {
      await this.producer.connect();
      await this.producer.send({
        topic: this.topic,
        messages: [
          {
            key: this.getKey(message),
            partition: this.getPartition(message),
            headers: {
              type: message.type,
              "X-Correlation-ID": context.correlationId,
            },
            value: JSON.stringify(message.data), // Data should be serialized to a string
          },
        ],
      });
    } catch (error) {
      console.error("Error publishing message:", error);
      throw error;
    } finally {
      await this.producer.disconnect();
    }
  }
}
