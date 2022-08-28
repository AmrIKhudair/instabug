import styles from '../styles/Home.module.css'
import Event from '../types/Event'

export default function EventRow ({ event }: {event: Event }) {
    return (
        <div className={styles.row}>
            <div className={styles.td}>{event.actor_name}</div>
            <div className={styles.td}>{event.action.name}</div>
            <div className={styles.td}>{event.occured_at}</div>
        </div>
    )
}