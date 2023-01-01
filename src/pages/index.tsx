import type { NextPage } from 'next'
import { useCallback, useEffect, useState } from 'react'
import { Graph } from 'src/components/Graph'
import { PrefectureSelect } from 'src/components/PrefectureSelect'
import { Layout } from 'src/layout'
import { useFetchPopulationData } from 'src/lib/hooks/useFetchPopulationData'
import { useGraphLabels } from 'src/lib/hooks/useGraphLabels'
import { GraphData } from 'src/lib/type/graphData'

import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [prefectureCheckedList, setPrefectureCheckedList] = useState<number[]>(
    []
  )
  const { getGraphLabels, graphLabels, graphLabelsError } = useGraphLabels()
  const { fetchPopulationData } = useFetchPopulationData()
  const [graphDataList, setGraphDataList] = useState<GraphData[]>([])

  const getPopulationData = useCallback(async () => {
    const list = prefectureCheckedList.map((prefecture) => {
      return fetchPopulationData(prefecture)
    })
    const dataList = await Promise.all(list)
    setGraphDataList(dataList as GraphData[])
  }, [prefectureCheckedList])

  useEffect(() => {
    getPopulationData()
  }, [getPopulationData, prefectureCheckedList])

  useEffect(() => {
    getGraphLabels()
  }, [])

  if (graphLabelsError instanceof Error) {
    return <div>{graphLabelsError.message}</div>
  }

  return (
    <Layout>
      <PrefectureSelect setPrefectureCheckedList={setPrefectureCheckedList} />
      <div>
        <Graph datasets={graphDataList} labels={graphLabels} />
      </div>
    </Layout>
  )
}

export default Home
