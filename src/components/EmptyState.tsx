export default function EmptyState({ message = "Nenhum item encontrado." }: { message?: string }) {
    return (
        <div className="text-center py-8 text-stone-500">
            {message}
        </div>
    );
}
