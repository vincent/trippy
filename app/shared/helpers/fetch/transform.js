export default function transform(transformation) {
  return function (data) {
    debugger;
    return transformation(data);
  }
}
