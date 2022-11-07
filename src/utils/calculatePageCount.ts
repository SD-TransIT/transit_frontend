const calculatePagesCount = (pageSize: number, totalCount: number) => (
  totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize)
);

export default calculatePagesCount;
