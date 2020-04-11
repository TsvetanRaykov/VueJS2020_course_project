import moment from 'moment'
export default (timestamp, format) => {
    // if(!format){
    //     format='DD MMMM YYYY HH:mm';
    // }
    return moment(timestamp).format(format || 'DD MMMM YYYY HH:mm')
};
