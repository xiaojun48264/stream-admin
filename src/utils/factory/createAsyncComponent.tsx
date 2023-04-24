import { defineAsyncComponent, FunctionalComponent, CSSProperties, Component, h } from 'vue'

interface SpinProps {
  size?: number
  dot?: boolean
  tip?: string
  icon?: Component
  show?: boolean
}

interface Options {
  delay?: number
  timeout?: number
  retry?: boolean
  loading?: boolean
  spin?: SpinProps
}

const DefaultLoadingProps: SpinProps = {
  size: 24,
  tip: '加载中...',
}

const Loading: FunctionalComponent<SpinProps> = props => {
  props = { ...DefaultLoadingProps, ...props }
  const slots: { icon?: Component } = {}
  if (props.icon) {
    slots.icon = h(props.icon)
  }

  const style: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
  }

  return (
    <div style={style}>
      <a-spin {...props} loading={true} v-slots={slots} />
    </div>
  )
}

export function createAsyncComponent(loader: Fn, options: Options = {}) {
  const { delay = 100, timeout = 1000 * 30, retry = true, loading = true, spin = {} } = options

  return defineAsyncComponent({
    loader,
    delay,
    timeout,
    loadingComponent: loading ? <Loading {...spin} /> : undefined,
    errorComponent: <a-result status='error' title='加载失败！' />,
    onError: retry
      ? undefined
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            retry()
          } else {
            fail()
          }
        },
  })
}
