"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Plus,
  Trash2,
  Eye,
  Save,
  X,
  Lock,
  Upload,
  ImageIcon,
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  Edit,
  ExternalLink,
} from "lucide-react"
import { articleOperations, productOperations, type Article, type Product } from "@/lib/database"
import { toast } from "@/hooks/use-toast"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [articleForm, setArticleForm] = useState({
    id: "",
    title: "",
    category: "",
    readTime: 0,
    excerpt: "",
    content: "",
    image: "",
    seoTitle: "",
    seoDescription: "",
    keywords: "",
    h1: "",
    h2Tags: [] as string[],
    h3Tags: [] as string[],
    images: [] as string[],
    affiliateButtons: [] as { text: string; url: string; style: string }[],
  })
  const [productForm, setProductForm] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    rating: 0,
    amazonUrl: "",
    description: "",
    features: "",
    image: "",
    pros: [] as string[],
    cons: [] as string[],
  })
  const [activeTab, setActiveTab] = useState("articles")
  const [articles, setArticles] = useState<Article[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [previewContent, setPreviewContent] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const authStatus = localStorage.getItem("admin_authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
      loadData()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.email === "admin@massagezen.com" && loginForm.password === "MassageZen2024!") {
      setIsAuthenticated(true)
      localStorage.setItem("admin_authenticated", "true")
      loadData()
      toast({ title: "Connexion réussie!" })
    } else {
      toast({ title: "Email ou mot de passe incorrect", variant: "destructive" })
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin_authenticated")
    setLoginForm({ email: "", password: "" })
  }

  const loadData = async () => {
    const [articlesData, productsData] = await Promise.all([articleOperations.getAll(), productOperations.getAll()])
    setArticles(articlesData)
    setProducts(productsData)
  }

  const insertAtCursor = (text: string) => {
    if (!contentRef.current) return
    const start = contentRef.current.selectionStart
    const end = contentRef.current.selectionEnd
    const content = articleForm.content
    const newContent = content.substring(0, start) + text + content.substring(end)
    setArticleForm({ ...articleForm, content: newContent })

    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.focus()
        contentRef.current.setSelectionRange(start + text.length, start + text.length)
      }
    }, 0)
  }

  const insertHeading = (level: number) => {
    const headingText = `${"#".repeat(level)} Votre titre ici\n\n`
    insertAtCursor(headingText)
  }

  const insertButton = () => {
    const buttonHtml = `<div class="my-6">
  <a href="VOTRE_LIEN_AMAZON" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
    <ExternalLink className="w-4 h-4 mr-2" />
    Voir sur Amazon
  </a>
</div>\n\n`
    insertAtCursor(buttonHtml)
  }

  const insertImage = () => {
    const imageHtml = `<div class="my-6">
  <img src="/votre-image.jpg" alt="Description de l'image" class="w-full rounded-lg shadow-md" />
  <p class="text-sm text-gray-600 mt-2 text-center italic">Légende de l'image</p>
</div>\n\n`
    insertAtCursor(imageHtml)
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Simulate upload - in real app, upload to your storage
      const imageName = file.name
      const imageUrl = `/uploads/${imageName}`
      setArticleForm({
        ...articleForm,
        images: [...articleForm.images, imageUrl],
      })
      insertImage()
      toast({ title: `Image ${imageName} ajoutée!` })
    }
  }

  const handleCreateArticle = async () => {
    if (!articleForm.title || !articleForm.content || !articleForm.category) {
      toast({ title: "Veuillez remplir tous les champs obligatoires", variant: "destructive" })
      return
    }

    try {
      const slug = articleForm.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      const articleData = {
        ...articleForm,
        slug,
        publishedAt: new Date().toISOString(),
        id: editingItem || Date.now().toString(),
      }

      if (editingItem) {
        await articleOperations.update(editingItem, articleData)
        toast({ title: "Article mis à jour avec succès!" })
      } else {
        await articleOperations.create(articleData)
        toast({ title: "Article publié avec succès!" })
      }

      resetArticleForm()
      loadData()
    } catch (error) {
      toast({ title: "Erreur lors de la sauvegarde", variant: "destructive" })
    }
  }

  const handleEditArticle = (article: Article) => {
    setArticleForm({
      id: article.id,
      title: article.title,
      category: article.category,
      readTime: article.readTime,
      excerpt: article.excerpt,
      content: article.content,
      image: article.image || "",
      seoTitle: article.seoTitle || "",
      seoDescription: article.seoDescription || "",
      keywords: "",
      h1: "",
      h2Tags: [],
      h3Tags: [],
      images: [],
      affiliateButtons: [],
    })
    setEditingItem(article.id)
    setIsCreating(true)
  }

  const handleDeleteArticle = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        await articleOperations.delete(id)
        toast({ title: "Article supprimé avec succès!" })
        loadData()
      } catch (error) {
        toast({ title: "Erreur lors de la suppression", variant: "destructive" })
      }
    }
  }

  const handleCreateProduct = async () => {
    if (!productForm.name || !productForm.category || !productForm.amazonUrl) {
      toast({ title: "Veuillez remplir tous les champs obligatoires", variant: "destructive" })
      return
    }

    try {
      const productData = {
        ...productForm,
        id: editingItem || Date.now().toString(),
        features: productForm.features.split(",").map((f) => f.trim()),
      }

      if (editingItem) {
        await productOperations.update(editingItem, productData)
        toast({ title: "Produit mis à jour avec succès!" })
      } else {
        await productOperations.create(productData)
        toast({ title: "Produit ajouté avec succès!" })
      }

      resetProductForm()
      loadData()
    } catch (error) {
      toast({ title: "Erreur lors de la sauvegarde", variant: "destructive" })
    }
  }

  const handleEditProduct = (product: Product) => {
    setProductForm({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || "",
      rating: product.rating,
      amazonUrl: product.amazonUrl,
      description: product.description,
      features: Array.isArray(product.features) ? product.features.join(", ") : product.features,
      image: product.image || "",
      pros: [],
      cons: [],
    })
    setEditingItem(product.id)
    setIsCreating(true)
    setActiveTab("products")
  }

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        await productOperations.delete(id)
        toast({ title: "Produit supprimé avec succès!" })
        loadData()
      } catch (error) {
        toast({ title: "Erreur lors de la suppression", variant: "destructive" })
      }
    }
  }

  const resetArticleForm = () => {
    setArticleForm({
      id: "",
      title: "",
      category: "",
      readTime: 0,
      excerpt: "",
      content: "",
      image: "",
      seoTitle: "",
      seoDescription: "",
      keywords: "",
      h1: "",
      h2Tags: [],
      h3Tags: [],
      images: [],
      affiliateButtons: [],
    })
    setIsCreating(false)
    setEditingItem(null)
  }

  const resetProductForm = () => {
    setProductForm({
      id: "",
      name: "",
      category: "",
      price: "",
      originalPrice: "",
      rating: 0,
      amazonUrl: "",
      description: "",
      features: "",
      image: "",
      pros: [],
      cons: [],
    })
    setIsCreating(false)
    setEditingItem(null)
  }

  const generatePreview = () => {
    const content = articleForm.content
      .replace(/### (.*)/g, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
      .replace(/## (.*)/g, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/# (.*)/g, '<h1 class="text-3xl font-bold mt-8 mb-6">$1</h1>')
      .replace(/\n\n/g, '</p><p class="mb-4">')

    setPreviewContent(`<div class="prose max-w-none"><p class="mb-4">${content}</p></div>`)
    setShowPreview(true)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Administration MassageZen</CardTitle>
            <p className="text-muted-foreground">Connectez-vous pour accéder au panneau d'administration</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="admin@massagezen.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </form>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Identifiants de démonstration :</p>
              <p className="text-sm font-mono">Email: admin@massagezen.com</p>
              <p className="text-sm font-mono">Mot de passe: MassageZen2024!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Administration MassageZen Pro</h1>
            <p className="text-muted-foreground">Interface complète de gestion de contenu</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="articles">Articles ({articles.length})</TabsTrigger>
            <TabsTrigger value="products">Produits ({products.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Gestion des Articles</h2>
              <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
                <Plus className="h-4 w-4 mr-2" />
                {editingItem ? "Modifier l'Article" : "Nouvel Article"}
              </Button>
            </div>

            {isCreating && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{editingItem ? "Modifier l'Article" : "Créer un Article"}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={resetArticleForm}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="content" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="content">Contenu</TabsTrigger>
                      <TabsTrigger value="seo">SEO</TabsTrigger>
                      <TabsTrigger value="media">Médias</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="article-title">Titre de l'article *</Label>
                          <Input
                            id="article-title"
                            value={articleForm.title}
                            onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                            placeholder="Comment choisir son pistolet de massage..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="article-category">Catégorie *</Label>
                          <Select
                            value={articleForm.category}
                            onValueChange={(value) => setArticleForm({ ...articleForm, category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner une catégorie" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="guide">Guide d'achat</SelectItem>
                              <SelectItem value="comparatif">Comparatif</SelectItem>
                              <SelectItem value="bien-etre">Bien-être</SelectItem>
                              <SelectItem value="actualite">Actualité</SelectItem>
                              <SelectItem value="test">Test produit</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="article-excerpt">Extrait *</Label>
                        <Textarea
                          id="article-excerpt"
                          value={articleForm.excerpt}
                          onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                          placeholder="Résumé accrocheur de l'article..."
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Éditeur de contenu *</Label>
                        <div className="border rounded-lg">
                          <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/50">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => insertHeading(1)}
                              title="Titre H1"
                            >
                              <Heading1 className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => insertHeading(2)}
                              title="Titre H2"
                            >
                              <Heading2 className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => insertHeading(3)}
                              title="Titre H3"
                            >
                              <Heading3 className="h-4 w-4" />
                            </Button>
                            <div className="w-px h-6 bg-border mx-1" />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => insertAtCursor("**Texte en gras**")}
                              title="Gras"
                            >
                              <Bold className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => insertAtCursor("*Texte en italique*")}
                              title="Italique"
                            >
                              <Italic className="h-4 w-4" />
                            </Button>
                            <div className="w-px h-6 bg-border mx-1" />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={insertImage}
                              title="Insérer une image"
                            >
                              <ImageIcon className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={insertButton}
                              title="Bouton d'affiliation"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={handleImageUpload}
                              title="Upload image"
                            >
                              <Upload className="h-4 w-4" />
                            </Button>
                            <div className="w-px h-6 bg-border mx-1" />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={generatePreview}
                              title="Prévisualiser"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                          <Textarea
                            ref={contentRef}
                            value={articleForm.content}
                            onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                            placeholder="Rédigez votre article ici... Utilisez # pour les titres, **gras**, *italique*"
                            rows={15}
                            className="border-0 resize-none focus-visible:ring-0"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Utilisez la barre d'outils pour formater votre contenu. Markdown supporté.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="seo" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="article-seo-title">Titre SEO</Label>
                        <Input
                          id="article-seo-title"
                          value={articleForm.seoTitle}
                          onChange={(e) => setArticleForm({ ...articleForm, seoTitle: e.target.value })}
                          placeholder="Titre optimisé pour Google (50-60 caractères)"
                        />
                        <p className="text-xs text-muted-foreground">{articleForm.seoTitle.length}/60 caractères</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="article-seo-description">Description SEO</Label>
                        <Textarea
                          id="article-seo-description"
                          value={articleForm.seoDescription}
                          onChange={(e) => setArticleForm({ ...articleForm, seoDescription: e.target.value })}
                          placeholder="Description meta pour Google (150-160 caractères)"
                          rows={3}
                        />
                        <p className="text-xs text-muted-foreground">
                          {articleForm.seoDescription.length}/160 caractères
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="article-keywords">Mots-clés SEO</Label>
                        <Input
                          id="article-keywords"
                          value={articleForm.keywords}
                          onChange={(e) => setArticleForm({ ...articleForm, keywords: e.target.value })}
                          placeholder="massage, pistolet massage, bien-être"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="article-read-time">Temps de lecture (minutes)</Label>
                        <Input
                          id="article-read-time"
                          type="number"
                          value={articleForm.readTime}
                          onChange={(e) => setArticleForm({ ...articleForm, readTime: Number(e.target.value) })}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="media" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="article-image">Image principale</Label>
                        <Input
                          id="article-image"
                          value={articleForm.image}
                          onChange={(e) => setArticleForm({ ...articleForm, image: e.target.value })}
                          placeholder="/massage-article.png"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Upload d'images</Label>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleImageUpload}
                          className="w-full bg-transparent"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Télécharger une image
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>

                      {articleForm.images.length > 0 && (
                        <div className="space-y-2">
                          <Label>Images ajoutées</Label>
                          <div className="grid grid-cols-3 gap-2">
                            {articleForm.images.map((img, index) => (
                              <div key={index} className="relative">
                                <img
                                  src={img || "/placeholder.svg"}
                                  alt={`Upload ${index}`}
                                  className="w-full h-20 object-cover rounded"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-1 right-1 h-6 w-6 p-0"
                                  onClick={() => {
                                    const newImages = articleForm.images.filter((_, i) => i !== index)
                                    setArticleForm({ ...articleForm, images: newImages })
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>

                  <div className="flex space-x-2 mt-6">
                    <Button onClick={handleCreateArticle} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      {editingItem ? "Mettre à jour" : "Publier l'Article"}
                    </Button>
                    <Button variant="outline" onClick={generatePreview}>
                      <Eye className="h-4 w-4 mr-2" />
                      Prévisualiser
                    </Button>
                    <Button variant="outline" onClick={resetArticleForm}>
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Articles Publiés ({articles.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {articles.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Aucun article publié. Créez votre premier article !
                  </p>
                ) : (
                  <div className="space-y-4">
                    {articles.map((article) => (
                      <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={article.image || "/massage-article.png"}
                            alt={article.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{article.title}</h3>
                            <p className="text-sm text-muted-foreground">{article.category}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary">{article.readTime} min</Badge>
                              <Badge variant="outline">{new Date(article.publishedAt).toLocaleDateString()}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/blog/${article.slug}`} target="_blank" rel="noreferrer">
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditArticle(article)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteArticle(article.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Gestion des Produits</h2>
              <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
                <Plus className="h-4 w-4 mr-2" />
                {editingItem ? "Modifier le Produit" : "Nouveau Produit"}
              </Button>
            </div>

            {isCreating && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{editingItem ? "Modifier le Produit" : "Ajouter un Produit"}</CardTitle>
                    <Button variant="ghost" size="sm" onClick={resetProductForm}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-name">Nom du produit *</Label>
                      <Input
                        id="product-name"
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        placeholder="Ex: Theragun PRO Plus"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-category">Catégorie *</Label>
                      <Select
                        value={productForm.category}
                        onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pistolets">Pistolets de Massage</SelectItem>
                          <SelectItem value="coussins">Coussins Chauffants</SelectItem>
                          <SelectItem value="fauteuils">Fauteuils de Massage</SelectItem>
                          <SelectItem value="cervicaux">Appareils Cervicaux</SelectItem>
                          <SelectItem value="pieds">Masseurs Pieds</SelectItem>
                          <SelectItem value="dos">Appareils Dos</SelectItem>
                          <SelectItem value="jambes">Appareils Jambes</SelectItem>
                          <SelectItem value="oculaires">Appareils Oculaires</SelectItem>
                          <SelectItem value="tete">Appareils Tête</SelectItem>
                          <SelectItem value="pressotherapie">Pressothérapie</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-price">Prix *</Label>
                      <Input
                        id="product-price"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                        placeholder="599€"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-original-price">Prix original</Label>
                      <Input
                        id="product-original-price"
                        value={productForm.originalPrice}
                        onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                        placeholder="699€"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product-rating">Note</Label>
                      <Input
                        id="product-rating"
                        type="number"
                        step="0.1"
                        max="5"
                        value={productForm.rating}
                        onChange={(e) => setProductForm({ ...productForm, rating: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-amazon-url">Lien Amazon (avec votre ID affilié) *</Label>
                    <Input
                      id="product-amazon-url"
                      value={productForm.amazonUrl}
                      onChange={(e) => setProductForm({ ...productForm, amazonUrl: e.target.value })}
                      placeholder="https://amazon.fr/dp/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-description">Description *</Label>
                    <Textarea
                      id="product-description"
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      placeholder="Description détaillée du produit..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-features">Caractéristiques (séparées par des virgules) *</Label>
                    <Input
                      id="product-features"
                      value={productForm.features}
                      onChange={(e) => setProductForm({ ...productForm, features: e.target.value })}
                      placeholder="6 vitesses, Batterie 150min, Ultra silencieux"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="product-image">URL de l'image</Label>
                    <Input
                      id="product-image"
                      value={productForm.image}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      placeholder="/massage-device.png"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={handleCreateProduct} className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      {editingItem ? "Mettre à jour" : "Ajouter le Produit"}
                    </Button>
                    <Button variant="outline" onClick={resetProductForm}>
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Produits Existants ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    Aucun produit ajouté. Créez votre premier produit !
                  </p>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <img
                            src={product.image || "/massage-device.png"}
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary">{product.price}</Badge>
                              <Badge variant="outline">{product.rating}★</Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={product.amazonUrl} target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Prévisualisation de l'article</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <h1 className="text-3xl font-bold mb-4">{articleForm.title}</h1>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: previewContent }} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
