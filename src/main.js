
import { supabase } from './supabase.js'

const articleList = document.querySelector('#article-list')
const popup = document.getElementById('popup')
const popupForm = document.getElementById('popup-form')
const popupTitle = document.getElementById('popup-title')
const popupContent = document.getElementById('popup-content')
const popupAuthor = document.getElementById('popup-author')
const popupSubmit = document.getElementById('popup-submit')
const logoutButton = document.getElementById('logout-button')
const addArticleButton = document.getElementById('add-article-button')

let editArticle = null

function openPopup(article = null) {
  popup.classList.remove('hidden')

  if (article) {
    editArticle = article.id
    popupTitle.value = article.title
    popupContent.value = article.content
    popupAuthor.value = article.author
  } else {
    editArticle = null
    popupForm.reset()
  }
}

function closePopup() {
  popup.classList.add('hidden')
  popupForm.reset()
  editArticle = null
}

popupForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const data = {
    title: popupTitle.value,
    content: popupContent.value,
    author: popupAuthor.value,
    created_at: new Date().toISOString()
  }

  if (editArticle) {
    await supabase.from('articles').update(data).eq('id', editArticle)
  } else {
    await supabase.from('articles').insert([data])
  }

  closePopup()
  fetchArticles()
})

addArticleButton.addEventListener('click', () => openPopup())

logoutButton.addEventListener('click', async () => {
  await supabase.auth.signOut()
  window.location.href = '/login/index.html'
})

async function fetchArticles() {
  const { data: articles } = await supabase.from('articles').select('*').order('created_at', { ascending: false })

  articleList.innerHTML = ''
  const { data: sessionData } = await supabase.auth.getSession()
  const user = sessionData.session?.user

  if (!user) {
    addArticleButton.classList.add('hidden')
  } else {
    addArticleButton.classList.remove('hidden')
  }

  articles.forEach(article => {
    const articleEl = document.createElement('article')
    articleEl.className = 'bg-white p-4 mb-4 rounded shadow'

    articleEl.innerHTML = `
      <h2 class="text-xl font-bold">${article.title}</h2>
      <h3 class="text-sm text-gray-500 mb-2">${article.author} - ${new Date(article.created_at).toLocaleDateString()}</h3>
      <p>${article.content}</p>
    `

    if (user) {
      const controls = document.createElement('div')
      controls.className = 'mt-4 flex gap-2'

      const editBtn = document.createElement('button')
      editBtn.textContent = 'Edytuj'
      editBtn.className = 'bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600'
      editBtn.onclick = () => openPopup(article)

      const deleteBtn = document.createElement('button')
      deleteBtn.textContent = 'Usuń'
      deleteBtn.className = 'bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
      deleteBtn.onclick = async () => {
        await supabase.from('articles').delete().eq('id', article.id)
        fetchArticles()
      }

      controls.appendChild(editBtn)
      controls.appendChild(deleteBtn)
      articleEl.appendChild(controls)
    }

    articleList.appendChild(articleEl)
  })
}

fetchArticles()
