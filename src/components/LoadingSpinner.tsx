export default function LoadingSpinner({ message = "Carregando..." }: { message?: string }) {
    return (
        <div className="text-center py-8 text-amber-600 font-medium">
            {message}
        </div>
    );
}
