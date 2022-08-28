import styles from '../styles/Home.module.css'
import Event from '../types/Event'

interface Props {
    event: Event,
    expanded?: boolean,
    onClick: () => void
}

export default function EventRow ({ event, expanded = false, onClick }: Props) {
    return (
        <div className={expanded ? styles.expanded : styles.row} onClick={onClick}>
            { !expanded && (
                <>
                    <div className={styles.td}>{event.actor_name}</div>
                    <div className={styles.td}>{event.action.name}</div>
                    <div className={styles.td}>{event.occured_at}</div>
                </>
            )}
            {
                expanded && (
                    <div className={styles.card}></div>
                )
            }
        </div>
    )
}