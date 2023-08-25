interface IconProps {
  fill?: `#${string}`
}

export const IconBookMar: React.FC<IconProps> = ({ fill = '#0F1729' }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='22'
      height='22'
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        fill={fill}
        fillRule='evenodd'
        d='M9.788 3h4.424c.819 0 1.494 0 2.044.046.571.047 1.096.149 1.588.404a4 4 0 011.706 1.706c.255.492.357 1.017.404 1.588.046.55.046 1.225.046 2.044v8.835c0 .962 0 1.752-.053 2.353-.05.566-.16 1.233-.599 1.716a2.5 2.5 0 01-2.13.8c-.649-.074-1.17-.504-1.58-.897-.436-.417-.956-1.011-1.59-1.736l-.377-.431c-.435-.497-.719-.82-.954-1.046-.228-.219-.336-.271-.39-.29a1 1 0 00-.653 0c-.055.019-.163.071-.39.29-.236.226-.52.55-.955 1.046l-.377.431c-.634.725-1.154 1.32-1.59 1.736-.41.393-.931.823-1.58.897a2.5 2.5 0 01-2.13-.8c-.44-.483-.55-1.15-.6-1.716C4 19.376 4 18.586 4 17.623V8.788c0-.819 0-1.494.046-2.044.047-.571.149-1.096.404-1.588A4 4 0 016.156 3.45c.492-.255 1.017-.357 1.588-.404C8.294 3 8.969 3 9.788 3zM7.909 5.039c-.445.037-.672.104-.83.186a2 2 0 00-.854.853c-.082.159-.15.386-.186.831C6 7.367 6 7.96 6 8.83v8.743c0 1.025 0 1.726.045 2.228.036.413.094.543.1.558a.5.5 0 00.391.147c.014-.008.143-.067.443-.354.363-.35.826-.876 1.5-1.648l.373-.425c.399-.456.74-.846 1.046-1.14.32-.307.675-.583 1.123-.738a3 3 0 011.958 0c.448.155.802.43 1.123.738.306.294.647.684 1.046 1.14l.372.425c.675.772 1.138 1.299 1.501 1.648.3.287.429.346.443.354a.5.5 0 00.392-.147c.005-.015.063-.145.099-.558.044-.502.045-1.203.045-2.228V8.83c0-.871 0-1.463-.039-1.92-.037-.446-.104-.673-.186-.832a2 2 0 00-.853-.853c-.159-.082-.386-.15-.832-.186C15.633 5 15.041 5 14.17 5H9.83c-.871 0-1.463 0-1.92.039z'
        clipRule='evenodd'
      ></path>
    </svg>
  )
}