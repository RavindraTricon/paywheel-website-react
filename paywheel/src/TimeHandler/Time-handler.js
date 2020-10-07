import React, { useState } from 'react';
import differenceInHours from 'date-fns/differenceInHours';
import differenceInMinutes from 'date-fns/differenceInMinutes';
import differenceInDays from 'date-fns/differenceInDays'




export function TimeLeftHandler(props) {
    const [timeleft, SetTimeleft] = useState();
    const [timeUnit, SetTimeUnit] = useState();
    // function timer (){
        setInterval (() => {
            const date = new Date();
            const hours = differenceInHours(new Date(props.time), date );
            const minutes = differenceInMinutes(new Date(props.time), date );
            const days = differenceInDays(new Date(props.time), date );
            // const second = differenceInSeconds(new Date(props.time), date );
            if ( days  === 0  ) {
                if ( hours  < 1  ) {
                    SetTimeleft(minutes);
                    SetTimeUnit('Minutes')
                } else {
                    SetTimeleft(hours);
                    SetTimeUnit('Hours');
                }
            } else {
                SetTimeleft(days);
                SetTimeUnit('Days');
            }

        }, 1000);

    
    return (
        <div>
            <p>{timeleft} {timeUnit} left</p>
        </div>
    );
}

export default TimeLeftHandler;