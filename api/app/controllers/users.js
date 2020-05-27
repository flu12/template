const usersService = require('../services/users');

const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await usersService.getById(id);

    res.status(200).json({
      user,
    })
  } catch (error) {
    res.status(500).json({ error });
  }
};

const edit = async (req, res) => {
  try {
    const user = await usersService.edit(req.params.id, req.body);
    res
      .status(200)
      .json({
        success: true,
        user,
      });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteById = async (req, res) => {
  try {
    await usersService.deleteById(req.params.id);

    res.status(200).json({
      success: true
    })
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getById,
  edit,
  deleteById,
};
