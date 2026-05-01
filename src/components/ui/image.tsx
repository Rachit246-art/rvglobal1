import { forwardRef, type ImgHTMLAttributes } from 'react'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fittingType?: string;
  originWidth?: number;
  originHeight?: number;
  focalPointX?: number;
  focalPointY?: number;
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ fittingType, originWidth, originHeight, focalPointX, focalPointY, ...props }, ref) => {
    return <img ref={ref} {...props} />
  }
)
Image.displayName = 'Image'
