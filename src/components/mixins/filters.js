import moment from 'moment'
export default {
    filters: {
        dateFormat: timestamp => moment(timestamp).format('DD MMMM YYYY HH:mm')
    }
}
