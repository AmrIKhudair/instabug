import styles from '../styles/Home.module.css'

export default function Event ({ event }: {event: { [key: string]: string } }) {
    return (
        <div className={styles.row}>
            <div className={styles.td}>{event.actor}</div>
            <div className={styles.td}>{event.action}</div>
            <div className={styles.td}>{event.date}</div>
        </div>
    )
}