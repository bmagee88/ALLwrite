declare module "vis-network/standalone/umd/vis-network.min" {
  import { DataSetOptions, DataSet } from "vis-data";

  export interface Node {
    id: number | string;
    label?: string;
    [key: string]: any;
  }

  export interface Edge {
    from: number | string;
    to: number | string;
    [key: string]: any;
  }

  export interface Data {
    nodes: DataSet<Node>;
    edges: DataSet<Edge>;
  }

  export interface NodeOptions {
    id: number | string;
    label?: string;
    [key: string]: any;
  }

  export interface EdgeOptions {
    from: number | string;
    to: number | string;
    [key: string]: any;
  }

  export interface Data {
    nodes: DataSet<NodeOptions>;
    edges: DataSet<EdgeOptions>;
  }

  export interface Options {
    [key: string]: any;
  }

  export class Network {
    constructor(container: HTMLElement, data: Data, options?: Options);
  }

  export { DataSet };
}
