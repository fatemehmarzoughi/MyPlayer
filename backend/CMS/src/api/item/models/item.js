module.exports = {
  lifecycles: {
    async beforeUpdate(params, data) {
      // If the likeListUser field is present and it has changed (a user has been added or removed), update the likes count
      if ("likeListUser" in data && Array.isArray(data.likeListUser)) {
        const likeCount = data.likeListUser.length;
        data.likes = likeCount; // Update the likes field with the new count
      }
    },

    async beforeCreate(data) {
      // If the likeListUser field is present when creating a new post, set the initial likes count accordingly
      if ("likeListUser" in data && Array.isArray(data.likeListUser)) {
        const likeCount = data.likeListUser.length;
        data.likes = likeCount; // Set the initial likes field with the count
      }
    },
  },
};
