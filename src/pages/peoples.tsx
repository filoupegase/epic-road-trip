import useSWR from "swr";
import type { Person } from '@/interface';
import PersonComponent from '../_common/components/Person';


const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Activities() {
    const { data, error, isLoading } = useSWR<Person[]>('/api/people', fetcher)

    if (error) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>
    if (!data) return null

    return (
        <>
            <h1>Activities</h1>
            <ul>
                { data.map((p, index) => (
                    <PersonComponent key={ index } person={ p } />
                )) }
            </ul>
        </>
    )
}
