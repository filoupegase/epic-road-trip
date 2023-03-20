import useSWR from "swr";
import type { Activities } from '@/interface';


const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Activites() {
    const { data, error, isLoading } = useSWR<Activities[]>('/api/activiti', fetcher)

    if (error) return <div>Failed to load</div>
    if (isLoading) return <div>Loading...</div>
    if (!data) return null

    console.log(data);

    return (
        <>
            <h1>Activities</h1>
        </>
    )
}
