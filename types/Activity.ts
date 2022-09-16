export interface Activity {
    id: string,
    actor_name: string,
    actor_icon: string,
    action_name: string,
    action_args: {[key: string]: string},
    target_name: string,
    target_icon: string,
    occured_at: string,
}