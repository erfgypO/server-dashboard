export default function StateBadge({ state }: { state: string }) {
    let stateClass = '';
    switch (state) {
        case 'running': {
            stateClass = 'badge-success';
            break;
        }
        case 'restarting':
        case 'removing':
        case 'dead': {
            stateClass = 'badge-error';
            break;
        }
        case 'exited': {
            stateClass = 'badge-neutral';
            break;
        }
        default: {
            stateClass = 'badge-warning';
            break;
        }
    }
    return <div className={`badge gap-3 ${stateClass}`}>
        {state}
    </div>
}
