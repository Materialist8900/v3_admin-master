import Mock from 'mockjs'
// 模拟用户列表
Mock.mock('/api/userList', 'get', {
  status: 200,
  message: '获取用户列表成功',
  data: [
    { id: '@increment(1)', username: 'admin', password: '123456' },
    { id: '@increment(1)', username: '李鹏图', password: '123456' },
    { id: '@increment(1)', username: '李卓君', password: '12345678' },
  ],
})
// 模拟学生信息数据
// 生成学生信息的假数据，保证学号和姓名的唯一性
const students = Mock.mock({
  'data|25': [
    {
      'id|+1': 10001,
      name: `@cname(2,3)`,
      'gender|1': ['男', '女'],
      'major|1': ['计算机科学与技术', '信息管理与信息系统', '软件工程', '网络工程'],
      'clubs|1-3': [],
    },
  ],
})
// 所有社团名称
const nameArr = Mock.Random.shuffle([
  '乒社',
  '羽社',
  '吉他社',
  '跆拳道社',
  '篮球🐔社',
  '新媒体',
  '文学社',
  '电影社',
  '校团委',
  '校级院级学生会',
  '团总支',
  '宿管会',
  '数学社',
  '计算机社',
  '青年志愿者协会',
  '人力资源社',
  '阳光互助社',
  '辩论社',
  '商业社',
])
// 社团信息
const clubs = Mock.mock({
  'data|19': [
    {
      'id|+1': 1,
      name: () => nameArr.pop(),
      established_date: '@date("yyyy-MM-dd")',
      members: [],
    },
  ],
})

// 为学生信息和社团信息添加关联数据
students.data.forEach(student => {
  // 随机选择参加的社团数量
  const clubCount = Mock.Random.integer(1, 3) // 限制数量为 1-3
  // 随机选择参加的社团
  const joinedClubs = Mock.Random.shuffle(clubs.data).slice(0, clubCount)
  joinedClubs.forEach(club => {
    student.clubs.push(club.name)
    club.members.push(student.name)
  })
})

Mock.mock('/api/students', 'get', {
  status: 200,
  message: '获取学生信息成功',
  data: students.data,
})

Mock.mock('/api/clubs', 'get', {
  status: 200,
  message: '获取社团信息成功',
  data: clubs.data,
})
