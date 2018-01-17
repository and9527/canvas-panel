Simple annotation details demo, clicking on an annotation will show a popup box with content customised
for this particular manifest. This could however be expanded greatly into a general purpose annotation reading tool.
```js
initialState = { annotation: null };
<div style={{ background: '#eee', padding: 10 }}>
  <div style={{ width: 300, display: 'inline-block' }}>
    <Manifest url="https://iiif.library.nuigalway.ie/manifests/p135/memoir.json">
      <CanvasProvider startCanvas={72}>
        <Viewport maxWidth={300}>
          <SingleTileSource viewportController={true}>
            <OpenSeadragonViewport>
              <OpenSeadragonViewer maxHeight={1000} />
             </OpenSeadragonViewport>
          </SingleTileSource>
          <AnnotationCanvasRepresentation ratio={0.1} onClickAnnotation={annotation => setState({ annotation })}/> 
        </Viewport>
      </CanvasProvider>
    </Manifest>
  </div>
  <div style={{ width: 300, display: 'inline-block', padding: 30 }}>
  { state.annotation ? (
    <AnnotationDetail annotation={state.annotation} onClose={() => setState({ annotation: null })} />
  ) : 'Click annotation to see more.' }
  </div>
</div>
```