import type { FC } from 'react'
import { Line } from 'react-chartjs-2'
import type { GraphData } from 'src/lib/type/graphData'
import { defaultGraphSets } from 'src/lib/utils/utils'
import styles from './index.module.css'

type GraphType = {
  datasets: GraphData[]
  labels: number[]
}

export const Graph: FC<GraphType> = (props) => {
  const { datasets, labels } = props

  const data = {
    labels: labels,
    datasets: datasets.length === 0 ? defaultGraphSets : datasets,
  }

  return (
    <div className={styles.graph}>
      <Line data={data} />
    </div>
  )
}
