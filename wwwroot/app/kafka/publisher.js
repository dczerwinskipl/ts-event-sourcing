"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaMessagePublisher = void 0;
const uuid_1 = require("uuid");
class KafkaMessagePublisher {
    topic;
    producer;
    getKey;
    getPartitionKey;
    constructor(kafkaClient, options) {
        this.producer = kafkaClient.producer({
            allowAutoTopicCreation: true,
        });
        this.topic = options.topic;
        this.getKey = options.getKey ?? ((_) => (0, uuid_1.v4)());
        this.getPartitionKey = options.getPartitionKey;
    }
    getPartition(message) {
        if (!this.getPartitionKey)
            return;
        const key = this.getPartitionKey(message);
        console.log(key);
        return undefined;
    }
    async publish(message) {
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
                        },
                        value: JSON.stringify(message.data), // Data should be serialized to a string
                    },
                ],
            });
        }
        catch (error) {
            console.error("Error publishing message:", error);
            throw error;
        }
        finally {
            await this.producer.disconnect();
        }
    }
}
exports.KafkaMessagePublisher = KafkaMessagePublisher;
