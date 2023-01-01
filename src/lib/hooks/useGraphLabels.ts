import { useCallback, useState } from 'react'
import type { PopulationDataJson } from 'src/lib/type/populationDataJson'

export const useGraphLabels = () => {
  const [graphLabels, setGraphLabels] = useState<number[]>([])
  const [graphLabelsError, setGraphLabelsError] = useState<unknown>()

  const getGraphLabels = useCallback(async () => {
    try {
      const populationDataFromAPI = await fetch(`/api/populationAPI/1`)
      if (!populationDataFromAPI.ok) {
        throw new Error('X軸のデータの取得に失敗しました')
      }

      const populationDataJson: PopulationDataJson =
        await populationDataFromAPI.json()
      const wholePopulation = populationDataJson.result.data.find((pop) => {
        return pop.label === '総人口'
      })

      if (!wholePopulation) {
        return
      }

      const populationYear = wholePopulation.data.map((d) => {
        return d.year
      })
      setGraphLabels(populationYear)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setGraphLabelsError(error)
      }
    }
  }, [])

  return { graphLabelsError, graphLabels, getGraphLabels }
}
