import {Kafka} from "kafkajs";
import prismaClient from "./config/db";


export default async function publishOutboxEvents() {
    const kafka = new Kafka({brokers : ["localhost:9092"]});
    const producer = kafka.producer();
    await producer.connect();

    const events = await prismaClient.outboxEvent.findMany({
        where : {
            processed : false
        }
    });

    for(const event of events)
    {
        await producer.send({
            topic : event.eventType,
            messages : [{value : JSON.stringify(event.payload)}]
        })

        await prismaClient.outboxEvent.update({
            where : {
                id : event.id
            },
            data : {
                processed : true
            }
        })
    }

    await producer.disconnect();
    
}