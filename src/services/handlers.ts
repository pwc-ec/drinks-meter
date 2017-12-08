export const ENTER = 13

export const disableEnter = onKeyDown => e => {
  if (e.keyCode === ENTER) {
    e.preventDefault()
  }
  if (onKeyDown) {
    onKeyDown(e)
  }
}
