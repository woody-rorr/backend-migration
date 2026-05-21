export async function getMyFollowsHandler(req, res) {
  // TODO: JWT에서 userid 추출
  // TODO: FollowCtrl.getMyFollows(userid, follow_type) 호출
  res.status(200).type('json').send({ message: 'GET /follow/my - Not implemented yet' });
}

export async function getListWithFollowHandler(req, res) {
  // TODO: JWT에서 userid 추출
  // TODO: FollowCtrl.getListWithFollow(userid, follow_type, limit, offset) 호출
  res.status(200).type('json').send({ message: 'GET /follow/list - Not implemented yet' });
}

export async function getTeamsWithFollowHandler(req, res) {
  // TODO: JWT에서 userid 추출
  // TODO: FollowCtrl.getTeamsWithFollow(userid, limit, offset) 호출
  res.status(200).type('json').send({ message: 'GET /follow/list/teams - Not implemented yet' });
}

export async function putFollowsBatchHandler(req, res) {
  // TODO: JWT에서 userid 추출
  // TODO: Body validation
  // TODO: FollowCtrl.putFollowsBatch(userid, body) 호출
  res.status(200).type('json').send({ message: 'PUT /follow - Not implemented yet' });
}

export async function deleteFollowHandler(req, res) {
  // TODO: JWT에서 userid 추출
  // TODO: Path params: followType, targetId
  // TODO: FollowCtrl.deleteFollow(userid, { follow_type, target_id }) 호출
  res.status(200).type('json').send({ message: 'DELETE /follow/:followType/:targetId - Not implemented yet' });
}
