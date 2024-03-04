import React, {useState, useEffect} from 'react';

function Clock() {

    const [time, setTime] = useState(new Date()); 

    // esegue il codice 1 volta quando monta il component avendo lasciato l'empty array come dependency
    useEffect(() => {
        const intervalId = setInterval(() => {
            // callback di setInterval
            setTime(new Date());
        }, 1000); /*tempo in ms per ripetere la callback*/
        
        // f per fermare il clock in caso di unmount del component
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    // f per formattare il tempo
    function formatTime(){
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();

        // controlliamo se sia pm o am
        const meridiem = hours >= 12 ? "PM"  : "AM";
        // formattiamo il tempo nel formato adatto con %, in caso sia 12 display 12 al posto di 0
        hours = hours % 12 || 12;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
    }

    // f per aggiungere uno 0 davanti al numero in modo che il formato sia sempre 00:00:00
    function padZero(number){
        return (number < 10 ? "0" : "") + number;
    }

    return(
        <div className='clock-container'>
            <div className='clock'>
                <span>{formatTime()}</span>
            </div>
        </div>
    );
}

export default Clock