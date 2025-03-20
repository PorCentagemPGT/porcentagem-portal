'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { LoginForm, LoginFormData } from '@/components/forms/LoginForm';
import { AuthService } from '@/services/auth.service';
import { PublicRoute } from '@/components/auth/PublicRoute';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (data: LoginFormData) => {
    const response = await AuthService.signIn(data);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao realizar login');
    }

    const result = await response.json();
    
    // Salva os dados de autenticação de forma segura
    AuthService.saveAuth({
      tokens: result.tokens,
      user: result.user,
    });

    // Redireciona para o dashboard
    router.push('/dashboard');
  };

  return (
    <PublicRoute>
      <div className="flex min-h-screen flex-1">
      
        <div className="relative hidden w-0 flex-1 lg:block">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-sky-400 to-blue-500">
            <Image
              src="/heroLogin.png"
              alt="Login Hero"
              width={5000}
              height={5000}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="PorCentagem Logo"
                width={150}
                height={150}
                priority
              />
            </div>

            <div className="mt-10">
              <div>
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Entre na sua conta
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Não tem uma conta?{' '}
                  <a
                    href="/signup"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Cadastre-se
                  </a>
                </p>
              </div>

              <div className="mt-10">
                <LoginForm onSubmit={handleLogin} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
}
