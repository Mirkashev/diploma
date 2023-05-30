/* eslint-disable @typescript-eslint/ban-types */

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Array<infer X>
    ? ReadonlyArray<DeepReadonly<X>>
    : T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};

export type AppConfig = DeepReadonly<{
  db: {
    host: string;
    port: number;
    dbname: string;
    user: string;
    pass: string;
    ca?: string;
  };
  minio: {
    endPoint: string,
    port: number
    useSSL: false, // If on localhost, keep it at false. If deployed on https, change to true
    accessKey: string
    secretKey: string
  }
}>;

