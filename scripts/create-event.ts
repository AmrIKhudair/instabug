import { argv } from 'process'
import axios from 'axios'
import casual from 'casual'
import { generateId } from "../lib/database"

const action_names = ['incident.create_succeeded', 'user.invited_teammate', 'user.login_succeeded', 'user.searched_activity_log_events']

const action_name = action_names[Math.floor(action_names.length * Math.random())]

const event = {
    actor_id: generateId('user'),
    actor_name: casual.name,
    group: casual.domain,
    action_name,
    target_id: generateId('user'),
    target_name: casual.name,
    location: casual.ip,
    occured_at: casual.date("YYYY-MM-DDTHH:MM:SSZ"),
    metadata: {
        redirect: casual.url,
        description: casual.short_description,
        x_request_id: generateId('req')
    }
}

const url = (argv[2] || 'http://localhost:3000')

axios.post(url + '/api/events', event)
    .then(res => console.log(res.data)).catch(console.error)