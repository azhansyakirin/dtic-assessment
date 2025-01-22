export function parseUser(userData: Record<string, any>[]) {

  const sanitizeUserdata = userData.map(user => ({
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    email: user.email,
    location: {
      state: user.location.state,
      country: user.location.country,
    },
    thumbnail: user.picture.thumbnail,
  }))

  console.log({ userData, sanitizeUserdata })

  return sanitizeUserdata;
}