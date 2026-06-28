export type BookCondition = '全新' | '九成新' | '八成新' | '七成新' | '六成新及以下'

export interface Book {
  id: number
  title: string
  author: string
  price: number
  cover: string
  college: string
  condition: BookCondition
  sellerId: number
  sellerName: string
  description: string
}

export const COLLEGES = [
  '计算机学院',
  '经济管理学院',
  '外国语学院',
  '数学与统计学院',
  '物理学院',
  '化学学院',
  '文学院',
  '法学院',
  '机械工程学院',
  '电子信息学院',
]

export const CONDITIONS: BookCondition[] = [
  '全新',
  '九成新',
  '八成新',
  '七成新',
  '六成新及以下',
]

const COVER_PROMPTS = [
  'vintage book cover hardcover classic novel on wooden desk warm lighting',
  'old textbook with yellowed pages stack of books university library aesthetic',
  'academic textbook paperback colorful cover study desk setup',
  'hardcover book with dust jacket collector edition beautiful design',
  'chinese literature book cover traditional ink painting style',
  'modern textbook glossy cover with mathematical formulas',
  'programming book with code on cover tech aesthetic minimal',
  'literature novel artistic book cover watercolor illustration',
  'economics textbook with charts and graphs professional design',
  'language learning book with bilingual text educational',
]

function getCover(index: number): string {
  const prompt = encodeURIComponent(COVER_PROMPTS[index % COVER_PROMPTS.length])
  return `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${prompt}&image_size=portrait_4_3`
}

const SAMPLE_BOOKS: Omit<Book, 'cover'>[] = [
  { id: 1, title: '算法导论（第三版）', author: 'Thomas H. Cormen', price: 68, college: '计算机学院', condition: '九成新', sellerId: 10086, sellerName: '书虫小周', description: '经典算法教材，笔记较少，整体成色好，适合算法学习和考研复习。涵盖排序、图论、动态规划等核心内容。' },
  { id: 2, title: '微观经济学', author: '高鸿业', price: 25, college: '经济管理学院', condition: '八成新', sellerId: 10087, sellerName: '经济学霸', description: '人大版经典教材，有少量下划线笔记，不影响阅读。配套习题集可赠送。' },
  { id: 3, title: '大学英语精读 第三册', author: '董亚芬', price: 15, college: '外国语学院', condition: '七成新', sellerId: 10088, sellerName: '外语达人', description: '上海外语教育出版社，有使用痕迹和笔记，磁带缺失。' },
  { id: 4, title: '高等数学（第七版）上册', author: '同济大学数学系', price: 20, college: '数学与统计学院', condition: '九成新', sellerId: 10089, sellerName: '数院学长', description: '同济版高数教材，全新未使用，买来发现重复了。封面完美，无笔记。' },
  { id: 5, title: '大学物理学', author: '张三慧', price: 30, college: '物理学院', condition: '八成新', sellerId: 10090, sellerName: '物理小能手', description: '清华大学出版社，有部分笔记和习题解答标注。' },
  { id: 6, title: '有机化学（第六版）', author: '汪小兰', price: 35, college: '化学学院', condition: '九成新', sellerId: 10091, sellerName: '化学少女', description: '高教社经典教材，几乎全新，仅写了名字。适合化学专业基础课。' },
  { id: 7, title: '中国文学史（全四卷）', author: '袁行霈', price: 80, college: '文学院', condition: '八成新', sellerId: 10092, sellerName: '文青小许', description: '北大袁行霈版中国文学史，考研必备。第二卷有少量笔记，其余较新。' },
  { id: 8, title: '民法总论', author: '梁慧星', price: 28, college: '法学院', condition: '七成新', sellerId: 10093, sellerName: '法考冲刺', description: '梁慧星教授经典著作，有大量笔记标注，适合深入学习。' },
  { id: 9, title: '机械设计基础', author: '杨可桢', price: 32, college: '机械工程学院', condition: '九成新', sellerId: 10094, sellerName: '机械理工男', description: '高教社教材，无笔记无划线，和新的一样。附赠课后习题答案。' },
  { id: 10, title: '模拟电子技术基础', author: '童诗白', price: 40, college: '电子信息学院', condition: '八成新', sellerId: 10095, sellerName: 'EE爱好者', description: '模电经典教材，有笔记和电路图标注，重点章节都有标记。' },
  { id: 11, title: '深入理解计算机系统', author: 'Randal E. Bryant', price: 75, college: '计算机学院', condition: '九成新', sellerId: 10096, sellerName: 'CS研究生', description: 'CSAPP 中文版，计算机系统入门必读。几乎全新，仅翻了前几章。' },
  { id: 12, title: '宏观经济学', author: '曼昆', price: 55, college: '经济管理学院', condition: '全新', sellerId: 10097, sellerName: '商科少女', description: '曼昆宏观经济学第九版，北大出版社。全新未拆封，买多了一本。' },
  { id: 13, title: '线性代数及其应用', author: 'David C. Lay', price: 45, college: '数学与统计学院', condition: '九成新', sellerId: 10098, sellerName: '数模达人', description: '国外经典线代教材，机械工业出版社。中文翻译版，有少量批注。' },
  { id: 14, title: 'C++ Primer 中文版', author: 'Stanley B. Lippman', price: 88, college: '计算机学院', condition: '八成新', sellerId: 10099, sellerName: 'Cpp程序员', description: 'C++ 经典巨著，第五版。书脊有轻微使用痕迹，内页干净。' },
  { id: 15, title: '古代汉语（全四册）', author: '王力', price: 60, college: '文学院', condition: '七成新', sellerId: 10100, sellerName: '国学爱好者', description: '王力先生主编古代汉语，中华书局版。有笔记和繁体标注，适合古文学习。' },
  { id: 16, title: '信号与系统', author: '奥本海姆', price: 50, college: '电子信息学院', condition: '九成新', sellerId: 10101, sellerName: '通信工程狮', description: '信号与系统经典教材，中文第二版。电子工业出版社，笔记极少。' },
]

export const MOCK_BOOKS: Book[] = SAMPLE_BOOKS.map((book, index) => ({
  ...book,
  cover: getCover(index),
}))

export const MOCK_USER = {
  id: 10086,
  nickname: '书虫小周',
  avatar: 'https://api.dicebear.com/7.x/thumbs/svg?seed=10086&backgroundColor=F5E6C8',
}

export const MOCK_PUBLISHED_IDS = [1, 17, 18]

export const MOCK_FAVORITE_IDS = [2, 5, 11, 14]
