import React from "react"
import { Sparklines, SparklinesLine, SparklinesSpots } from "react-sparklines"

const SparkLine = () => {

  document.title=" Sparkline Chart | HackUSU - Responsive Bootstrap 5 Admin Dashboard"

  return (
    <React.Fragment>
      <Sparklines
        data={[6, 2, 8, 4, 3, 8, 1, 3, 6, 5, 9, 2, 8, 1, 4, 8, 9, 8, 2, 1]}
        width={100}
        height={33}
      >
        <SparklinesLine
          style={{
            stroke: "rgba(2, 164, 153,0.8)",
            fill: "rgba(2, 164, 153,0.8)",
          }}
        />
        <SparklinesSpots style={{ fill: "rgba(2, 164, 153,0.3)" }} />
      </Sparklines>
    </React.Fragment>
  )
}

export default SparkLine
