export default function LoadingSpinner({ message = "Carregando..." }: { message?: string }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-amber-50 dark:bg-black">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-6"></div>
                <p className="text-2xl font-semibold text-stone-700">{message}</p>
            </div>
        </div>
    );
}
