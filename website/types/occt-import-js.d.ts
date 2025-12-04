declare module 'occt-import-js' {
  interface OcctMeshAttributes {
    position: {
      array: Float32Array
    }
    normal?: {
      array: Float32Array
    }
  }

  interface OcctMeshIndex {
    array: Uint32Array
  }

  interface OcctMesh {
    attributes: OcctMeshAttributes
    index?: OcctMeshIndex
    color?: [number, number, number]
  }

  interface OcctResult {
    success: boolean
    meshes: OcctMesh[]
  }

  interface OcctModule {
    ReadStepFile: (fileBuffer: Uint8Array, options: null) => OcctResult
  }

  function init(): Promise<OcctModule>
  export default init
}
