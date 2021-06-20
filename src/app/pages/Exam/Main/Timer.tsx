import { useTimer } from "react-timer-hook";

function Timer({ deadline }: { deadline: Date }) {
    const { minutes, seconds } = useTimer({ expiryTimestamp: deadline.getTime(), autoStart: true });

    return (
        <div>
            <span className="text-muted">{minutes}</span>
            <span className="text-muted mx-2">:</span>
            <span className="text-muted">{seconds}</span>
        </div>
    );
}

export default Timer;
