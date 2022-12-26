import { FC } from 'react'
import styles from './index.module.css'

export const Layout: FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <h1 className={styles.title}>都道府県別の総人口推移グラフ</h1>
      <div>{children}</div>
    </div>
  )
}
