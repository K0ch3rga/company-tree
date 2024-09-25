const svgTurnTopRight = '0,8,8,8'
const svgTurnLeftBottom = '8,0,8,8'
const svgTurnRightBottom = '-8,0,-8,8'
const svgTurnTopLeft = '0,8,-8,8'

type Point = [x: number, y: number]
export const createPaths = (
  parent: HTMLDivElement | null,
  children: HTMLDivElement[] | null
): string[] => {
  if (children && parent) {
    const parentCoords = parent.getBoundingClientRect()
    const parentBottom: Point = [parentCoords.x + parentCoords.width / 2, parentCoords.bottom]
    const coordDiffs = children
      .map((n: HTMLDivElement) => n.getElementsByClassName('wrapper')[0].getBoundingClientRect())
      .map((c: DOMRect): Point => [c.x + c.width / 2, c.y])
      .map((c: Point): Point => [c[0] - parentBottom[0], c[1] - parentBottom[1]])

    return coordDiffs
      .map((d) => (d[0] > 16 || d[0] < -16 ? Math.sign(d[0]) * (Math.abs(d[0]) - 16) : 0))
      .map((w) =>
        w >= 0
          ? w == 0
            ? `m 1,0 v 16`
            : `m 1,0 q ${svgTurnTopRight} h ${w} q ${svgTurnLeftBottom}`
          : `m 1,0 q ${svgTurnTopLeft} h ${w} q ${svgTurnRightBottom}`
      )
  } else return []
}
