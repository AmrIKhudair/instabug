import EventAction from "./EventAction"

export default interface Event {
    id: string
    object: 'event',
    actor_id: string,
    actor_name: string,
    group: string,
    action: EventAction,
    target_id: string,
    target_name: string,
    location: string,
    occured_at: string,
    metadata: { [key: string]: any }
}