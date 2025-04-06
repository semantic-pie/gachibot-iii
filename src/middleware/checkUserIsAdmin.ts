export const checkUserIsAdmin = (id?: string | number) => {
  return id
    ? [552178361, 965626457]
      .includes(Number(id))
    : false;
};
