/**
 * Created by vladtomsa on 2019-06-13
 */
function findNotDeletedMiddleware(next) {
  // allow search of deleted items

  if (!this._conditions.deleted) {
    this.where('deleted').ne(true);
  }

  next();
}

module.exports = {
  findNotDeletedMiddleware,
};
