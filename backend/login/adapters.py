from allauth.socialaccount.adapter import DefaultSocialAccountAdapter


class CustomSocialAccountAdapter(DefaultSocialAccountAdapter):

    def save_user(self, request, sociallogin, form=None):
        user = super().save_user(request, sociallogin, form)
        # Get the social account instance
        account = sociallogin.account

        # Check if the user logged in via Google
        if account.provider == 'google':

            # Get the Google user data
            user_data = sociallogin.account.extra_data

            # Save the Google user data to your CustomUser model
            user.first_name = user_data['given_name']
            user.last_name = user_data['family_name']
            user.email = user_data['email']
            user.save()

        return user
