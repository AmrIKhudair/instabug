import { ActionNames } from "../types/ActionNames";
import { Activity as IActivity } from "../types/Activity";
import BasicActivity from "./BasicActivity";

export default function Activity ({ value }: {value: IActivity}) {
    let icon: string  = '';
    let text: JSX.Element;

    switch (value.action_name) {
        case (ActionNames.StatusChanged):
            icon = '/icons/status-changed.png'
            text = (
                <>
                    changed the status from <strong>{value.action_args.old_value}</strong> to <strong>{value.action_args.new_value}</strong>.
                </>
            )

            break
        
        case (ActionNames.Assigned):
            icon = value.target_icon
            text= (
                <>
                    assigned the issue to <strong>{value.target_name}</strong>.
                </>
            )

            break

        case (ActionNames.NameUpdated):
            icon = '/icons/updated.png'
            text = (
                <>
                    updated the name of the issue from <strong>{value.action_args.old_value}</strong> to <strong>{value.action_args.new_value}</strong>.
                </>
            )

            break

        case (ActionNames.DescriptionUpdated):
            icon = '/icons/updated.png'
            text = <>updated the description of the issue.</>
            break

        case (ActionNames.PrioritySet):
            icon = '/icons/priority-set.png'
            text = (
                <>
                    set the priority to <strong>{value.action_args.new_value}</strong>.
                </>
            )

            break

        case (ActionNames.Created):
            icon = value.actor_icon
            text = <>craeted the issue.</>
            break

        default:
            text = <>{value.action_name}</>
    }

    return <BasicActivity icon={icon} actor_name={value.actor_name} text={text} time={value.occured_at}></BasicActivity>
}