import streamlit as st
from time import sleep
#fig = plot_point_cloud(pc, grid_size=3, fixed_bounds=((-0.75, -0.75, -0.75),(0.75, 0.75, 0.75)))

st.title('3D generation AI app')
prompt = st.text_input('Prompt')
button = st.button('Send')
if button:
   st.toast('Work in progress', icon='⚒️')
   #st.pyplot(fig)
   with st.spinner('Wait for it...'):
    sleep(5)

   st.toast('Finished', icon="✅")
   st.video('test.mp4')

