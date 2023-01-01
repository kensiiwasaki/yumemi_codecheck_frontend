import { usePrefectureData } from 'src/lib/hooks/usePrefectureData'
import type { PopulationDataJson } from 'src/lib/type/populationDataJson'
import { graphColor } from 'src/lib/utils/utils'

export const useFetchPopulationData = () => {
  const { prefData } = usePrefectureData()

  const fetchPopulationData = async (prefecture: number) => {
    const populationDataFromAPI = await fetch(
      `/api/populationAPI/${prefecture}`
    )
    if (!populationDataFromAPI.ok) {
      throw new Error('データの取得に失敗しました')
    }

    const populationDataJson: PopulationDataJson =
      await populationDataFromAPI.json()
    const prefectureName =
      prefData.find((pre) => {
        return pre.prefCode === prefecture
      })?.prefName || ''

    const wholePopulation = populationDataJson.result.data.find((pop) => {
      return pop.label === '総人口'
    })

    if (!wholePopulation) {
      return
    }

    const populationValue = wholePopulation.data.map((d) => {
      return d.value
    })

    const datasetItem = {
      label: prefectureName,
      data: populationValue,
      fill: false,
      borderColor: graphColor[prefecture],
    }

    return datasetItem
  }

  return { fetchPopulationData }
}
