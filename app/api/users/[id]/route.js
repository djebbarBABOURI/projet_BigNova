import User from "@/models/User";
import connectToDB from "@/utils/database";


export const DELETE = async (request, { params }) => {
    const { id } = params;

    try {
        await connectToDB();

        const deletedItem = await User.findByIdAndDelete(id);

        // Si l'élément n'existe pas
        if (!deletedItem) {
            return new Response(
                JSON.stringify({ success: false, message: 'Élément non trouvé' }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ success: true, message: 'Élément supprimé avec succès' }),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({ success: false, message: 'Erreur du serveur' }),
            { status: 500 }
        );
    }
};
