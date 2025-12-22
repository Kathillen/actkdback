import { Users, ClipboardList, Eye, Zap, CheckCircle, ArrowRight, Github, Shield, Database, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl text-foreground">TKD Manager</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#funcionalidades" className="text-muted-foreground hover:text-foreground transition-colors">Funcionalidades</a>
            <a href="#beneficios" className="text-muted-foreground hover:text-foreground transition-colors">Benefícios</a>
            <a href="#como-funciona" className="text-muted-foreground hover:text-foreground transition-colors">Como Funciona</a>
            <a href="#tecnologia" className="text-muted-foreground hover:text-foreground transition-colors">Tecnologia</a>
          </div>
          <Button variant="hero" size="lg" asChild>
            <a href="https://github.com/Kathillen/alunos-Taekwondo" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
              Ver no GitHub
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/60" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Sistema Open Source</span>
            </div>
            
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-secondary-foreground leading-none mb-6">
              GESTÃO DE ALUNOS<br />
              <span className="text-primary">TAEKWONDO</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              Solução rápida e prática para cadastrar, organizar e gerenciar os alunos da sua academia de Taekwondo.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <a href="https://github.com/Kathillen/alunos-Taekwondo" target="_blank" rel="noopener noreferrer">
                  Testar Demo
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="https://github.com/Kathillen/alunos-Taekwondo" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  Clonar Repositório
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-muted-foreground/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-muted-foreground/40 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Funcionalidades</span>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mt-2">
              TUDO QUE VOCÊ PRECISA
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              Um sistema completo para gerenciar todos os aspectos dos alunos da sua academia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Cadastro de Alunos",
                description: "Registre novos alunos com todos os campos essenciais: nome, idade, graduação, contato e mais."
              },
              {
                icon: ClipboardList,
                title: "Listagem Completa",
                description: "Visualize todos os alunos cadastrados em uma lista organizada e fácil de navegar."
              },
              {
                icon: Eye,
                title: "Visualização de Dados",
                description: "Acesse informações detalhadas de cada aluno de forma rápida e intuitiva."
              },
              {
                icon: Zap,
                title: "Interface Simples",
                description: "Design limpo e eficiente que permite operar o sistema sem complicações."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 border border-border"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-2xl text-card-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">Benefícios</span>
              <h2 className="font-display text-4xl md:text-6xl text-foreground mt-2 mb-8">
                POR QUE USAR O TKD MANAGER?
              </h2>

              <div className="space-y-6">
                {[
                  "Economize tempo com cadastros rápidos e organizados",
                  "Tenha controle total sobre os dados dos seus alunos",
                  "Sistema 100% gratuito e open source",
                  "Fácil de instalar e usar mesmo sem conhecimento técnico",
                  "Personalize conforme as necessidades da sua academia",
                  "Dados salvos localmente com segurança"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <p className="text-lg text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl p-8 border border-primary/20">
                <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
                  <div className="bg-secondary p-4 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-muted" />
                    <div className="w-3 h-3 rounded-full bg-muted" />
                    <span className="text-secondary-foreground text-sm ml-4 font-mono">alunos.json</span>
                  </div>
                  <div className="p-6 font-mono text-sm">
                    <pre className="text-muted-foreground">
{`{
  "alunos": [
    {
      "nome": "João Silva",
      "idade": 15,
      "graduacao": "Faixa Verde",
      "telefone": "(11) 99999-0000"
    },
    {
      "nome": "Maria Santos",
      "idade": 12,
      "graduacao": "Faixa Amarela",
      "telefone": "(11) 98888-0000"
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="como-funciona" className="py-24 bg-dark-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Passo a Passo</span>
            <h2 className="font-display text-4xl md:text-6xl text-secondary-foreground mt-2">
              COMO FUNCIONA
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto">
              Comece a usar o sistema em apenas 3 passos simples
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Clone o Repositório",
                description: "Faça o download ou clone do projeto diretamente do GitHub para sua máquina local."
              },
              {
                step: "02",
                title: "Execute o Sistema",
                description: "Rode o servidor Node.js e acesse a aplicação através do seu navegador."
              },
              {
                step: "03",
                title: "Comece a Cadastrar",
                description: "Adicione, visualize e gerencie os alunos da sua academia de forma simples e rápida."
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
                <div className="relative bg-secondary rounded-2xl p-8 border border-border h-full">
                  <span className="font-display text-7xl text-primary/20">{item.step}</span>
                  <h3 className="font-display text-3xl text-secondary-foreground mt-4 mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="tecnologia" className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Stack</span>
            <h2 className="font-display text-4xl md:text-6xl text-foreground mt-2">
              TECNOLOGIA UTILIZADA
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Code,
                title: "JavaScript",
                description: "Linguagem principal para toda a lógica da aplicação"
              },
              {
                icon: Database,
                title: "Node.js",
                description: "Runtime para execução do servidor backend"
              },
              {
                icon: Shield,
                title: "JSON",
                description: "Armazenamento leve e eficiente dos dados"
              }
            ].map((tech, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-card rounded-2xl border border-border shadow-card"
              >
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <tech.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="font-display text-2xl text-card-foreground mb-2">{tech.title}</h3>
                <p className="text-muted-foreground">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-6xl text-primary-foreground mb-6">
            PRONTO PARA COMEÇAR?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Simplifique a gestão da sua academia de Taekwondo hoje mesmo. É gratuito e open source!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="xl" 
              className="bg-primary-foreground text-secondary hover:bg-primary-foreground/90 font-bold"
              asChild
            >
              <a href="https://github.com/Kathillen/alunos-Taekwondo" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
                Acessar Repositório
              </a>
            </Button>
            <Button 
              size="xl"
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-secondary"
              asChild
            >
              <a href="https://github.com/Kathillen/alunos-Taekwondo/archive/refs/heads/main.zip">
                Baixar ZIP
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl text-secondary-foreground">TKD Manager</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a 
                href="https://github.com/Kathillen/alunos-Taekwondo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a 
                href="https://github.com/Kathillen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                @Kathillen
              </a>
            </div>
            
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} TKD Manager. Projeto Open Source.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
